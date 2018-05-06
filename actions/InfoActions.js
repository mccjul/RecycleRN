import {
  INFO,
} from './../constants/Settings';
import NavigatorService from './../utils/navigator';

export const getInfo = (photo, geo) => {
  return async (dispatch) => {
    var blobFile = photo.uri;
    let filename = blobFile.split('/').pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    var formData = new FormData();
    formData.append('file', { uri: blobFile, name: filename, type });
    formData.append("geo", geo);

    let result = await fetch("http://ac506176.ngrok.io/api", {
      method: "POST",
      body: formData,
      header: {
        'content-type': 'multipart/form-data',
      }
    });
    let responseJson = await result.json();
    dispatch({ type: INFO, payload: processResponse(responseJson) });
  }
}

const processResponse = (r) => {
  switch (r.type) {
    case "bac":
      return {
        Type: "Recyclage",
        Municipalite: r.municipalite,
        Frequence: r.frequence,
        Jour: r.jour,
        Info: r.info,
        displayModal: true
      };
      break;
    case "ordures":
      return {
        Type: "Poubelle",
        Municipalite: r.municipalite,
        Frequence: r.frequence,
        Jour: r.jour,
        Info: r.info,
        displayModal: true
      };
      break;
    case "Electronic":
        NavigatorService.navigate('map_screen');
      return {
        Type: "Électronique",
        NearestDropOff: r.NearestDropOff,
        Info: "Recyclez vos appareils électroniques aux electrobacs situés aux points suivants.",
        displayModal: true
      }
      break;
    default:
      console.log("uhoh");
      break;
  }
}
