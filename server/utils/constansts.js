var constants = {
  user:{
    defaultFields: 'firstName lastName isActive email role'
  },
  bus: {
    defaultFields: 'arName enName length stopsCount'
  },
  stop: {
    defautlFields: 'arName enName lat lng'
  },
  issue: {
    defautlFields:'creator submitTime startTime finishTime origin destination desc isClosed upVoteCount downVoteCount type'
  }
};

module.exports = constants;