function doGet() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("City");
  const data = ws.getRange("A1").getDataRegion().getValues();
  const headers = data.shift();

  const jsonArray = data.map(r => {
    let obj = {};
    headers.forEach((h,i) => {
      obj[h] = r[i];
    });
    return obj;
  });

  const response = [{status: 200, data: jsonArray}];
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}


function doPost(e) {
  // {"name": "zul"}
  const body = e.postData.contents;
  const bodyJSON = JSON.parse(body);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("test");
  ws.appendRow([bodyJSON.name]);
}