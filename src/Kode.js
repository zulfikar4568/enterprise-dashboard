function doGet() {
  const response = [{status: "ok!"}];
  return ContentService
    .createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
}


function doPost(e) {
  // {"name": "zul"}
  const body = e.postData.contents;
  const bodyJSON = JSON.parse(body);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("test");
  ws.appendRow([bodyJSON.name]);
}