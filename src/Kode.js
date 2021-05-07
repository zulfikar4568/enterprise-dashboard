function doGet() {

  const ss = SpreadsheetApp.getActiveSpreadsheet(); //get active spreadsheet
  const ws = ss.getSheetByName("AssemblyLine"); //get sheet
  const data = ws.getRange("A1").getDataRegion().getValues(); //get data from A1
  const headers = data.shift(); //get data headers

  // r = row, h = header, i = index
  const jsonArray = data.map(r => {
    let obj = {};
    let obj2 = {};
    let obj3 = {};
    let obj4 = {};
    let obj5 = {};
    let obj6 = {};
    let obj7 = {};
    headers.forEach((h,i) => {
      if (i<12){
        obj[h] = r[i];
      }else if(i==13){
        obj2[h] = r[i];
        obj[h] = obj2;
      }else if(i==14){
        obj3[h] = r[i];
        obj[h] = obj3;
      }else if(i==15){
        obj4[h] = r[i];
        obj[h] = obj4;
      }else if(i==16){
        obj5[h] = r[i];
        obj[h] = obj5;
      }else if(i==17){
        obj6[h] = r[i];
        obj[h] = obj6;
      }else if(i==18){
        obj7[h] = r[i];
        obj[h] = obj7;
      }
    });
    return obj;
  });

  const response = [{status: 200, data: jsonArray}];
  return sendJSON_(response);
}

function sendJSON_(jsonResponse){
  return ContentService
    .createTextOutput(JSON.stringify(jsonResponse))
    .setMimeType(ContentService.MimeType.JSON);
}