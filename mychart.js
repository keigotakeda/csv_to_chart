// 2) CSVから２次元配列に変換
function csv2Array(str) {
  var csvData = [];
  var lines = str.split("\n");
  for (var i = 0; i < lines.length; ++i) {
    var cells = lines[i].split(",");
    csvData.push(cells);
  }
  return csvData;
}

function drawBarChart(data) {
  // 3)chart.jsのdataset用の配列を用意
  var tmpLabels = [], tmpData1 = [], tmpData2 = [];

  // *************
  // *** 方法１ *** 使わない
  // *************
  // for (var row in data) {
  //   if(row[0] == 0) { // 一行目はラベル用
  //     var label1 = data[0][0];
  //     var label2 = data[0][1];
  //     continue;
  //   };
  //   tmpLabels.push(data[row][0])
  //   tmpData1.push(data[row][1])
  //   tmpData2.push(data[row][2])
  // };

  // ******************
  // *** 方法２ 採用！ **
  // ******************
  var chartTitle = data[0][0];
  var label1 = data[0][1];
  var label2 = data[0][2];

  // document.write(data.length - 2);

  // チャートの範囲を指定
  rowFrom = rowFrom != '' ? rowFrom : 0;
  rowTo = rowTo != '' ? rowTo : data.length - 1;
  // document.write(rowFrom);
  // document.write(rowTo);

  // チャートの範囲指定がおかしければ、初期値を返す
  if(rowFrom > rowTo) {
    rowFrom = 0;
    rowTo = data.length - 1;
  }

  // CSVを配列に格納
  for (var row = rowFrom; row <= rowTo; row++) {
    if(row == 0) { // 一行目はラベル用
      continue;
    };
    tmpLabels.push(data[row][0])
    tmpData1.push(data[row][1])
    tmpData2.push(data[row][2])
  };

  // 4)chart.jsで描画
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: tmpLabels,
      datasets: [
        { label: label1, data: tmpData1, backgroundColor: "pink" },
        { label: label2, data: tmpData2, backgroundColor: "skyblue" }
      ]
    },
    options: {
        title: {
            display: true,
            text: chartTitle,
            fontSize: 22
        }
    }
  });
}

function main() {
  // 1) ajaxでCSVファイルをロード
  var req = new XMLHttpRequest();
  var filePath = 'data.csv';
  req.open("GET", filePath, true);
  req.onload = function() {
    // 2) CSVデータ変換の呼び出し
    data = csv2Array(req.responseText);
    // 3) chart.jsデータ準備、4) chart.js描画の呼び出し
    drawBarChart(data);
  }
  req.send(null);
}

//　実行
main();
