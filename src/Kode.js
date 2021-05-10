function doGet() {

  const ss = SpreadsheetApp.getActiveSpreadsheet(); //get active spreadsheet
  const ws = ss.getSheetByName("Plant"); //get sheet
  const data = ws.getRange("A1").getDataRegion().getValues(); //get data from A1
  const headers = data.shift(); //get data headers

  // r = row, h = header, i = index
  const jsonArray = data.map(r => {
    let obj = {};
    headers.forEach((h,i) => {
      obj[h] = r[i];
    });
    return obj;
  });

  const response = [{status: 200, data: jsonArray}];
  return sendJSON_(response);
}


function doPost(e){
  let flag = false;
  const ss = SpreadsheetApp.getActiveSpreadsheet(); //get active spreadsheet
  const ws = ss.getSheetByName("Plant"); //get sheet
  let IdAssembly = e.parameter.IdAssembly;
  let lastRow = ws.getLastRow();

  for (var row = 1; row < lastRow; row++){
    let IdAssemblyServer = ws.getRange(row, 1).getValue();
    if (IdAssembly==IdAssemblyServer){
      ws.deleteRow(row);
      flag = true;
    }
  }
  if (flag==0){
    let result = "Id not found!";
  } else {
    let result = "Success delete";
  }
  result = JSON.stringify({"result": result});
  return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
}