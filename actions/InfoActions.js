import {
  INFO,
} from './../constants/Settings';

export const getInfo = (photo, geo) => {
  return async (dispatch) => {
    var blobFile = photo.uri;
    let filename = blobFile.split('/').pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    var formData = new FormData();
    formData.append('file', { uri: blobFile, name: filename, type });
    formData.append("geo", "45.4946761,-73.5644848");

    let result = await fetch("http://7a5bce7a.ngrok.io/api", {
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
        Municipalite: r.municipalite,
        Frequence: r.frequence,
        Jour: r.jour,
        Info: r.info,
        displayModal: true
      };
      break;
    case "ordures":
      return {
        Municipalite: r.municipalite,
        Frequence: r.frequence,
        Jour: r.jour,
        Info: r.info,
        displayModal: true
      };
      break;
    case "Electronic":
      return {
        NearestDropOff: r.NearestDropOff,
        displayModal: false
      }
      break;
    default:
      console.log("uhoh");
      break;
  }
}
