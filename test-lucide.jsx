import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { FileCheck, Navigation, CheckCircle, Play } from 'lucide-react';

try {
  console.log(renderToStaticMarkup(<FileCheck />));
  console.log(renderToStaticMarkup(<Navigation />));
  console.log(renderToStaticMarkup(<CheckCircle />));
  console.log(renderToStaticMarkup(<Play />));
} catch (e) {
  console.error(e);
}
