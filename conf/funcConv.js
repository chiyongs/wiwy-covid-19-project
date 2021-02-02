const funcConv = {
  incDecConv: (result) => {
    let resultList = [];
    for (let i = 0; i < result.length; i++) {
      resultList[i] = result[i].incDec;
    }
    return resultList;
  },
  defCntConv: (result) => {
    let resultList = [];
    for (let i = 0; i < result.length; i++) {
      resultList[i] = result[i].defCnt;
    }
    return resultList;
  },
  gubunConv: (result) => {
    let resultList = [];
    for (let i = 0; i < result.length; i++) {
      resultList[i] = result[i].gubun;
    }
    return resultList;
  },
};

module.exports = funcConv;
