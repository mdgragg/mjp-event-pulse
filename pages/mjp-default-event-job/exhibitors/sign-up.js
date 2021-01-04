import React, { useState } from 'react';
import { event_theme } from '../index';
import { useRouter } from 'next/router';
import Body from '../../../components/template1/Body';
import Section from '../../../components/template1/Section';
import Meta from 'components/globals/Meta';
import { getExhibitorMeta } from '../../../lib/api';
import { DropzoneArea } from 'material-ui-dropzone';

import Page from '../../../components/template1/Page';

import styled from 'styled-components';
import { Button, Paper } from '@material-ui/core';

const ExhibitorForm = styled(Paper)`
  && {
    font-size: 32px;
    display: block;
    cursor: pointer;
    margin-bottom: 10px;
    border: 1px solid #c4c4c4;
    border-radius: 7px;
    height: 100px;
    padding: 20px;
    transition: all 0.15s;
  }
  span {
    color: black;
    font-weight: 800;
  }
  &&.submitting {
    background-color: #e2e2e2;
  }
`;
const ExhibitorUpload = ({ data }) => {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({
    inputs: {},
    submitting: false,
    submitted: false,
  });

  const handleDropZone = (files) => {
    setFile(files[0]);
  };
  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setForm((prev) => ({
      ...prev,
      inputs: {
        ...prev.inputs,
        info: e.target.files[0],
      },
    }));
  };

  const handleUpload = async () => {
    setForm((prev) => ({
      ...prev,
      submitting: true,
    }));

    const upload = new FormData();
    upload.append('files.info', file, file.name);
    const data = {};
    upload.append('data', JSON.stringify(data));

    fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/exhibitors/${router.query.id}/upload`,
      {
        method: 'PUT',
        body: upload,
      }
    ).then((res) => {
      if (res.ok) {
        console.log(res);
        setForm((prev) => ({
          ...prev,
          submitting: false,
          submitted: true,
          message: 'Thank you your file has been uploaded!',
        }));
      } else {
        alert(
          'there was a problem with your upload please refresh and try again'
        );
      }
    });
  };

  return (
    <Page theme={event_theme}>
      <Meta title="Exhibitors"> </Meta>
      <Body>
        <Section>
          {form.submitted ? (
            <Paper
              style={{
                width: '50%',
                margin: 'auto',
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <h2>
                Thank you!
                <br /> Your presentation has been uploaded
              </h2>
            </Paper>
          ) : (
            <>
              <center>
                <h1>Exhibitor Sign Up</h1>
              </center>
              <ExhibitorForm
                className={form.submitting ? 'submitting' : ''}
                style={{
                  width: '50%',
                  margin: 'auto',
                  minHeight: '400px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <label for="file">
                  Video file for{' '}
                  <strong>
                    {' '}
                    {data.FirstName} {data.LastName}
                  </strong>
                </label>
                <br />
                <DropzoneArea
                  dropzoneText="Please click to upload your video presentation (only video files accepted, limit 1 file 1GB)"
                  onChange={handleDropZone}
                  acceptedFiles={['video/*']}
                  maxFileSize={1000000000}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleUpload();
                  }}
                >
                  Submit
                </Button>
              </ExhibitorForm>
            </>
          )}
        </Section>
      </Body>
    </Page>
  );
};

export async function getServerSideProps(ctx) {
  const id = ctx.query.id || null;
  let data;

  data = await getExhibitorMeta(`${id}`);

  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default ExhibitorUpload;

const data = {
  authMode: 'FULL',
  namedValues: {
    'Abstract Content (300 word max)': [''],
    'Principal Investigator Last Name': [''],
    'Job Title': [''],
    'Do you require an accommodation to participate in this event?': [''],
    Department: [''],
    Timestamp: ['1/4/2021 15:58:14'],
    'Title of Abstract': [''],
    'Submitter First Name': [''],
    'Principal Investigator First Name': [''],
    'Primary Author': [''],
    'Abstract Categoory': ['AI and ML'],
    'Email Address': [''],
    College: [''],
    'Submitter Last Name': [''],
    'Additional Authors': [''],
  },
  range: { columnEnd: 4, columnStart: 1, rowEnd: 9, rowStart: 9 },
  source: {},
  triggerUid: '5571102',
  values: [
    '1/4/2021 15:58:14',
    '',
    '',
    'AI and ML',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ],
};
