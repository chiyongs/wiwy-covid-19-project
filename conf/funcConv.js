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
  localOccCntConv: (result) => {
    let resultList = [];
    for (let i = 0; i < result.length; i++) {
      resultList[i] = result[i].localOccCnt;
    }
    return resultList;
  },
  overFlowCntConv: (result) => {
    let resultList = [];
    for (let i = 0; i < result.length; i++) {
      resultList[i] = result[i].overFlowCnt;
    }
    return resultList;
  },
  isolClearCntConv: (result) => {
    let resultList = [];
    for (let i = 0; i < result.length; i++) {
      resultList[i] = result[i].isolClearCnt;
    }
    return resultList;
  },
  isolIngCntConv: (result) => {
    let resultList = [];
    for (let i = 0; i < result.length; i++) {
      resultList[i] = result[i].isolIngCnt;
    }
    return resultList;
  },
  deathCntConv: (result) => {
    let resultList = [];
    for (let i = 0; i < result.length; i++) {
      resultList[i] = result[i].deathCnt;
    }
    return resultList;
  },
  locationConv: (result) => {
    let resultList = [];
    for (let i = 0; i < result.length; i++) {
      resultList[i] = result[i].location;
    }
    return resultList;
  },
  stepConv: (result) => {
    let resultList = [];
    for (let i = 0; i < result.length; i++) {
      resultList[i] = result[i].step;
    }
    return resultList;
  },
};

module.exports = funcConv;
