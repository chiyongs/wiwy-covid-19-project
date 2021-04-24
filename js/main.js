(() => {
  window.addEventListener("load", () => {
    document.body.classList.remove("before-load");

    window.addEventListener("scroll", () => {});

    //윈도우 창을 줄였을때 레이아웃 재설정
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        window.location.reload();
      }
    });

    //모바일 기기 방향을 바꿀때마다 나타나는 이벤트
    window.addEventListener("orientationchange", () => {
      scrollTo(0, 0);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    });

    document
      .querySelector(".loading")
      .addEventListener("transitionend", (e) => {
        document.body.removeChild(e.currentTarget);
      });
  }); //리소스가 다 로드 된다음 setLayout 함수 호출
})();
