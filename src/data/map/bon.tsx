import React from 'react';
import { MapData } from '.';

export const secondFloor: MapData = {
  data: {
    prefix: "bon2",
    width: 491.7,
    height: 491.7,
  },
  map: {
    "여자화장실": <polygon data-tip="여자화장실" points="106.6,70 161.1,70 161.1,23.3 92.5,23.3 92.5,61 92.6,61" />,
    "남자화장실": <polygon data-tip="남자화장실" points="70,106.6 61,92.6 61,92.5 23.3,92.5 23.3,161.1 70,161.1" />,
    "로비": <path data-tip="로비" d="M96.7,190.8h69.7v-7.3l0,0l17.1-17.1l7.3,0V96.7V70V0h-29.5v23.3h-0.3V70h-54.5l-14-9l0,0v0.1l-0.1-0.1 L61.1,92.5l0.1,0.1H61l0,0l9,14v54.5H23.3v0.3H0v29.5h70H96.7z M126.8,91.3c19.6,0,35.5,15.9,35.5,35.5s-15.9,35.5-35.5,35.5 s-35.5-15.9-35.5-35.5S107.2,91.3,126.8,91.3z" />,

    "1-1": <rect data-tip="1-1" y="190.8" width="70" height="77.4"/>,
    "1-2": <rect data-tip="1-2" y="268.2" width="70" height="77.4"/>,
    "1-3": <rect data-tip="1-3" y="345.6" width="70" height="77.1"/>,
    "1-4": <rect data-tip="1-4" x="96.7" y="345.6" width="69.7" height="77.1"/>,
    "1-5": <rect data-tip="1-5" x="96.7" y="268.2" width="69.7" height="77.4"/>,
    "1-6": <rect data-tip="1-6" x="96.7" y="190.8" width="69.7" height="77.4"/>,
    "복도1": <rect data-tip="복도" x="70" y="190.8" width="26.7" height="231.9"/>,

    "1": <rect data-tip="1" x="190.8" y="96.7" width="77.4" height="69.7"/>,
    "2": <rect data-tip="2" x="268.2" y="96.7" width="77.4" height="69.7"/>,
    "3": <rect data-tip="3" x="345.6" y="96.7" width="77.1" height="69.7"/>,
    "4": <rect data-tip="4" x="345.6" width="77.1" height="70"/>,
    "5": <rect data-tip="5" x="268.2" width="77.4" height="70"/>,
    "6": <rect data-tip="6" x="190.8" width="77.4" height="70"/>,
    "복도2": <rect data-tip="복도" x="190.8" y="70" width="231.9" height="26.7"/>,

    "계단1": <path data-tip="계단" d="M74.8,43.5c-4-4.2-9.7-6.8-16-6.8c-6.1,0-11.7,2.5-15.7,6.5c-4,4-6.5,9.6-6.5,15.7c0,6.3,2.6,11.9,6.8,16 l17.6,17.6l31.3-31.3L74.8,43.5z"/>,
    "계단2": <rect data-tip="계단" x="422.7" y="70" width="33.5" height="81.5" />,
    "계단3": <rect data-tip="계단" x="70" y="422.7" width="81.5" height="33.5"/>,

    // "other0": <path d="M183.5,166.3l-17.1,17.1l0,0v49.8c15.5-5.7,29.4-14.7,40.8-26.2c11.5-11.4,20.5-25.3,26.2-40.8L183.5,166.3z" data-ignore />,
    "other1": <path d="M491.7,35.5c0-19.6-15.9-35.5-35.5-35.5h-33.5v70h0.3h33.2v0.9C475.8,70.9,491.7,55,491.7,35.5z" data-ignore />,
    "other2": <path d="M70,423v-0.3H0v33.5c0,19.6,15.9,35.5,35.5,35.5c19.6,0,35.5-15.9,35.5-35.5H70V423z" data-ignore />,
    "other3": <ellipse transform="matrix(0.3827 -0.9239 0.9239 0.3827 -38.8814 195.47)" cx="126.8" cy="126.8" rx="35.5" data-ignore />,
  },
};
