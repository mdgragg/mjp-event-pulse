const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

export const createTemplate = ({ template, data }) => {
  var finaltemplate = Handlebars.compile(template);
  return finaltemplate(data);
};
