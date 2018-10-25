<?php
function h($s) {
  return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
}
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>chart of results</title>
</head>
<body>
<form action="index.php" method="post">
  <!-- <input type="text" name="rowFrom" placeholder="いつから"> -->
  <!-- <input type="text" name="rowTo" placeholder="いつまで"> -->

  <!-- チャートの開始 -->
  <select name="rowFrom">
    <option value="">-</option>
    <?php for($i = 1; $i <= 12; $i++) :?>
      <option value="<?= h($i); ?>"><?= h($i); ?></option>
    <?php endfor; ?>
  </select>　月から

  <!-- チャートの終わり -->
  <select name="rowTo">
    <option value="">-</option>
    <?php for($i = 1; $i <= 12; $i++) :?>
      <option value="<?= h($i); ?>"><?= h($i); ?></option>
    <?php endfor; ?>
  </select>　月まで

  <button>この期間でチャート！</button>
</form>

<!--ここにグラフが挿入されます-->
<div style="width: 100%; height: 100%;">
    <canvas id="myChart" style="width: 100%; height: auto;"></canvas>
</div>
<!-- 追記 -->
<!-- <script src="http://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.3.0/Chart.min.js"></script> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.3.0/Chart.min.js"></script>


<script>

  var rowFrom = <?php echo (int)h($_POST['rowFrom']); ?>;
  var rowTo = <?php echo (int)h($_POST['rowTo']); ?>;
  // var label1 = "Tokyo";
  // var label2 = "Osaka";
</script>
<script src="mychart.js"></script>
</body>
</html>
