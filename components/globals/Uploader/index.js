import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Dropzone from 'react-dropzone-uploader';
import { LinearProgress } from '@material-ui/core';

const Uploader = (props) => {
  const [visualStatus, useVisualStatus] = useState('');
  const [cloudUrl, setCloudUrl] = useState('');
  const [totalUpload, setTotalUpload] = useState({ showing: false });
  const [uploadingFile, setUploadingFile] = useState(null);
  // specify upload params and url for your files
  const getUploadParams = ({ file, meta }) => {
    const upload = new FormData();

    upload.append(
      'data',
      JSON.stringify({
        index: props.index,
        fileName: file.name,
      })
    );

    return {
      url: props.url,
      method: 'PUT',
      body: upload,
      //   headers: {
      //     Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjA5ODY1MzI3LCJleHAiOjE2MTI0NTczMjd9.giUuwF4ZBaOyOBWAFfwuj1b1kaoICPIsJPFmlD5SGDg`,
      //   },
    };
  };

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file, xhr }, status) => {
    if (status === 'done') {
      useVisualStatus('');
      const res = JSON.parse(xhr.response);
      setCloudUrl(res.message[0]);
    }
  };

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = async (files, allFiles) => {
    var loaded = 0;
    let start = loaded;
    var step = 600000;

    var total = files[0].file.size;
    const theFile = files[0].file;
    setUploadingFile(theFile);

    while (true) {
      let kill;
      setTotalUpload({
        showing: true,
        total,
        start,
      });
      const chunk = theFile.slice(start, start + step + 1);
      const calc_end = start + step < total ? start + step : total - 1;
      const h = new Headers();
      if (chunk.size < step) {
        h.append('content-length', 0);
      }
      h.append('Content-Range', `bytes ${start} - ${calc_end} / ${total}`);
      await fetch(cloudUrl, {
        method: 'PUT',
        headers: h,
        body: chunk,
      }).then((res) => {
        if (res.status !== 308) {
          kill = true;
        } else {
          kill = false;
          let range = res.headers.get('range');
          range = range.slice(range.search('-') + 1);
          range = parseInt(range, 10);
          start = range;
        }
      });
      if (kill) {
        setTotalUpload({ ...totalUpload, showing: false });
        useVisualStatus('success! you can close this window');
        break;
      }
    }

    console.log(files.map((f) => f.meta));
    allFiles.forEach((f) => f.remove());
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {totalUpload.showing ? (
        <div>
          <p>{visualStatus}</p>
          <p>
            {' '}
            Uploading <strong> {uploadingFile.name} </strong>to our servers...{' '}
            <br /> please do not close this window until complete!
          </p>
          <LinearProgress
            variant="determinate"
            value={Math.floor(100 * (totalUpload.start / totalUpload.total))}
          />
          {totalUpload.showing ? (
            <p>{Math.floor(100 * (totalUpload.start / totalUpload.total))}% </p>
          ) : (
            ''
          )}
        </div>
      ) : (
        <>
          <p>{visualStatus}</p>
          <Dropzone
            timeout={6000000}
            maxSizeBytes={1000000000}
            getUploadParams={getUploadParams}
            onChangeStatus={handleChangeStatus}
            onSubmit={handleSubmit}
            accept="image/*,audio/*,video/*"
            disabled={(files) =>
              files.some((f) =>
                ['preparing', 'getting_upload_params', 'uploading'].includes(
                  f.meta.status
                )
              )
            }
          />
        </>
      )}
    </div>
  );
};

Uploader.propTypes = {};

export default Uploader;
