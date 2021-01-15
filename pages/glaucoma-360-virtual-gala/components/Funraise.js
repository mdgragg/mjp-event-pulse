import React from 'react';
import PropTypes from 'prop-types';

const Funraise = (props) => {
  return (
    <script
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: `
        
          (function (f, u, n, r, a, i, s, e) {
          var data = {
            window: window,
            document: document,
            tag: 'script',
            data: 'funraise',
            orgId: f,
            uri: u,
            common: n,
            client: r,
            script: a,
          };
          var scripts;
          var funraiseScript;
          data.window[data.data] = data.window[data.data] || [];
          if (
            data.window[data.data].scriptIsLoading ||
            data.window[data.data].scriptIsLoaded
          )
            return;
          data.window[data.data].loading = true;
          data.window[data.data].push('init', data);
          scripts = data.document.getElementsByTagName(data.tag)[0];
          funraiseScript = data.document.createElement(data.tag);
          funraiseScript.async = true;
          funraiseScript.src =
            data.uri + data.common + data.script + '?orgId=' + data.orgId;
          scripts.parentNode.insertBefore(funraiseScript, scripts);
        })(
          '0d6c4935-52e1-42dd-acd3-0a41cbac2c41',
          'https://assets.funraise.io',
          '/widget/common/2.0',
          '/widget/client',
          '/inject-form.js'
        )`,
      }}
    ></script>
  );
};

export default Funraise;
