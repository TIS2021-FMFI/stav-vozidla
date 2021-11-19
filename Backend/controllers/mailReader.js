var fs = require('fs');
var parse = require('csv-parse');
var { Base64Decode } = require('base64-stream');
var Imap = require('imap');
var csvData = [];
var lastCheck;
var maxUID = 0;
const Sequelize = require('sequelize');
const db = require('../models');
const dataImporter = require('../controllers/dataImporter');

var imap = new Imap({
  user: 'stav.vozidla@gmail.com',
  password: 'Stavvozidla123',
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
  tlsOptions: { rejectUnauthorized: false },
  //,debug: function(msg){console.log('imap:', msg);}
});

function toUpper(thing) {
  return thing && thing.toUpperCase ? thing.toUpperCase() : thing;
}

function findAttachmentParts(struct, attachments) {
  attachments = attachments || [];
  for (var i = 0, len = struct.length, r; i < len; ++i) {
    if (Array.isArray(struct[i])) {
      findAttachmentParts(struct[i], attachments);
    } else {
      if (
        struct[i].disposition &&
        ['INLINE', 'ATTACHMENT'].indexOf(
          toUpper(struct[i].disposition.type)
        ) > -1
      ) {
        attachments.push(struct[i]);
      }
    }
  }
  return attachments;
}

function buildAttMessageFunction(attachment) {
  var filename = attachment.params.name;
  var encoding = attachment.encoding;

  return function (msg, seqno) {
    var prefix = '(#' + seqno + ') ';
    maxUID = seqno;
    msg.on('body', function (stream, info) {
      //Create a write stream so that we can stream the attachment to file;
      console.log(
        prefix + 'Streaming this attachment to file',
        filename,
        info
      );
      var writeStream = fs.createWriteStream(filename);
      writeStream.on('finish', function () {
        console.log(prefix + 'Done writing to file %s', filename);
      });

      //stream.pipe(writeStream); this would write base64 data to the file.
      //so we decode during streaming using

      if (toUpper(encoding) === 'BASE64') {
        //the stream is base64 encoded, so here the stream is decode on the fly and piped to the write stream (file)
        stream
          .pipe(new Base64Decode())
          .pipe(parse({ delimiter: ';' }))
          .on('data', async function (csvrow) {
            //do something with csvrow
            csvData.push(csvrow);
          })
          .on('end', function () {
            //do something with csvData
            //console.log(csvData);
          });
      } else {
        //here we have none or some other decoding streamed directly to the file which renders it useless probably
        stream.pipe(writeStream);
      }
    });
    msg.once('end', function () {
      console.log(prefix + 'Finished attachment %s', filename);
    });
  };
}

imap.once('ready', function () {
  imap.openBox('INBOX', true, async function (err, box) {
    if (err) throw err;
    //['UNSEEN', ['SINCE', moment(DATE_USER).format('ll')]]
    lastCheck = await db.EmailUID.findOrCreate({
      where: { id: 1 },
      // in the event that it is not found
      defaults: {
        lastEmailUID: 1,
      },
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
    });
    const LastUID = lastCheck[0].dataValues.lastEmailUID;
    if (LastUID + 1 == box.uidnext) {
      console.log('No new messages');
      return;
    }
    var f = imap.seq.fetch(`${LastUID + 1}:*`, {
      bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)'],
      struct: true,
    });
    f.on('message', function (msg, seqno) {
      console.log('Message #%d', seqno);
      var prefix = '(#' + seqno + ') ';
      msg.on('body', function (stream, info) {
        var buffer = '';
        stream.on('data', function (chunk) {
          buffer += chunk.toString('utf8');
        });
        stream.once('end', function () {
          console.log(
            prefix + 'Parsed header: %s',
            Imap.parseHeader(buffer)
          );
        });
      });
      msg.once('attributes', function (attrs) {
        var attachments = findAttachmentParts(attrs.struct);
        console.log(prefix + 'Has attachments: %d', attachments.length);
        for (var i = 0, len = attachments.length; i < len; ++i) {
          var attachment = attachments[i];
          /*This is how each attachment looks like {
              partID: '2',
              type: 'application',
              subtype: 'octet-stream',
              params: { name: 'file-name.ext' },
              id: null,
              description: null,
              encoding: 'BASE64',
              size: 44952,
              md5: null,
              disposition: { type: 'ATTACHMENT', params: { filename: 'file-name.ext' } },
              language: null
            }
          */
          console.log(
            prefix + 'Fetching attachment %s',
            attachment.params.name
          );
          var f = imap.fetch(attrs.uid, {
            //do not use imap.seq.fetch here
            bodies: [attachment.partID],
            struct: true,
          });
          //build function to process attachment message
          f.on('message', buildAttMessageFunction(attachment));
        }
      });
      msg.once('end', function () {
        console.log(prefix + 'Finished email');
      });
    });
    f.once('error', function (err) {
      console.log('Fetch error: ' + err);
    });
    f.once('end', function () {
      console.log('Done fetching all messages!');
      imap.end();
      return;
    });
  });
});

imap.once('error', function (err) {
  console.log(err);
});

imap.once('end', async function () {
  console.log('Connection ended');
  dataImporter.importData(csvData);
  await lastCheck[0].update({ lastEmailUID: maxUID });
  console.log('Last fetchd email UID set to ' + maxUID);
});

module.exports.connect = async () => {
  return imap.connect();
};
