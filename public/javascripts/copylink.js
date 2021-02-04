var copyLink = function (str) {
  if (is_ie()) {
    window.clipboardData.setData("Text", str);
    alert("복사되었습니다.");
    return;
  }
  prompt("Ctrl+C를 눌러 복사하세요.", str);
};

function is_ie() {
  if (navigator.userAgent.toLowerCase().indexOf("chrome") != -1) return false;
  if (navigator.userAgent.toLowerCase().indexOf("msie") != -1) return true;
  if (navigator.userAgent.toLowerCase().indexOf("windows nt") != -1)
    return true;
  return false;
}
