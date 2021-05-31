function doGet() {

  const ss = SpreadsheetApp.getActiveSpreadsheet(); //get active spreadsheet
  const ws = ss.getSheetByName("P&L_API"); //get sheet
  const data = ws.getRange("A1").getDataRegion().getValues(); //get data from A2
  const headers = data.shift(); //get data headers

  // r = row, h = header, i = index
  const jsonArray = data.map(r => {
    let obj = {};
    let obj2 = {};
    headers.forEach((h,i) => {
      if (i<=18){
        obj[h] = r[i];
      }else if(i==19){
        obj2[h] = r[i];
        obj[h] = obj2;
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

function doPost(e){
  const ss = SpreadsheetApp.getActiveSpreadsheet(); //get active spreadsheet
  const ws = ss.getSheetByName("P&L_API"); //get sheet
  
  switch(e.parameter.Action){
    case "delete":
      return doDelete(e, ws);
      break;
    case "update":
      return doUpdate(e, ws);
      break;
  }
}

function doUpdate(e, ws){
  let dataArray = [];
  dataArray.push(e.parameter.Year);
  dataArray.push(e.parameter.Month);
  dataArray.push(e.parameter.NetRevenue);
  dataArray.push(e.parameter.CostofGoodsSold);
  dataArray.push(e.parameter.GrossProfit);
  dataArray.push(e.parameter.MarketingAndPromotion);
  dataArray.push(e.parameter.Rent);
  dataArray.push(e.parameter.OfficeEquipment);
  dataArray.push(e.parameter.Maintenance);
  dataArray.push(e.parameter.DepreciationAndAmortization);
  dataArray.push(e.parameter.Utility);
  dataArray.push(e.parameter.TravelAndAccomodation);
  dataArray.push(e.parameter.MiscExpenses);
  dataArray.push(e.parameter.TotalExpense);
  dataArray.push(e.parameter.EBIT);
  dataArray.push(e.parameter.InterestExpense);
  dataArray.push(e.parameter.Taxes);
  dataArray.push(e.parameter.NetProfit);
  dataArray.push(e.parameter.Plant);
  let IdPAndL = e.parameter.IdPAndL;

  let flag = 0;
  let lastRow = ws.getLastRow();
  const headers = ws.getRange("A1").getDataRegion().getValues().shift();

  for (var row = 1; row < lastRow; row++){
    let IdPAndLServer = ws.getRange(row, 1).getValue();
    if (IdPAndL==IdPAndLServer){
      for(var column=1; column<=headers.length;column++){
        if (column>1){
          ws.getRange(row, column).setValue(dataArray[column-2]);
        }
      }
      flag = true;
    }
  }
  let message, status;
  if (flag==false){
    status = 404
    message = "Id is not found!";
  } else {
    status = 200
    message = "Success update the data";
  }
  message = JSON.stringify({"status": status, "message": message});
  return ContentService.createTextOutput(message).setMimeType(ContentService.MimeType.JSON);
}

function doDelete(e, ws){
  let flag = false;
  let IdPAndL = e.parameter.IdPAndL;
  let lastRow = ws.getLastRow();

  for (var row = 1; row < lastRow; row++){
    let IdPAndLServer = ws.getRange(row, 1).getValue();
    if (IdPAndL==IdPAndLServer){
      ws.deleteRow(row);
      flag = true;
    }
  }
  let message, status;
  if (flag==false){
    status = 404
    message = "Id is not found!";
  } else {
    status = 200
    message = "Success delete the data";
  }
  message = JSON.stringify({"status": status, "message": message});
  return ContentService.createTextOutput(message).setMimeType(ContentService.MimeType.JSON);
}