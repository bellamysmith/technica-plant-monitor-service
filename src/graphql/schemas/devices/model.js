class StatusReports {
  constructor(dynamoConnector) {
    this.dynamoConnector = dynamoConnector;
  }

  async createDevice(input) {
    const { id } = input;
    const transformedInput = {
      ...input,
      createTime: Date.now().toString(),
      id: id,
      pk: id,
      sk: 'DEVICE',
      dataType: 'DEVICE',
    };
    await this.dynamoConnector.saveAsUpdate(['pk', 'sk'], transformedInput);
    return {
      ...transformedInput,
      latestIncrement: null,
    };
  }

  async getDeviceInfo(id) {
    const response = await this.dynamoConnector.getByPartitionAndSortConditionOnIndex(
      'pk',
      id,
      'sk',
      ['DEVICE'],
      `EQ`,
      null,
      null,
      null,
    );
    return response;
  }

  async getAllDevices() {
    const response = await this.dynamoConnector.getByPartition(
      'sk',
      'DEVICE'
    );
    return response;
  }
}

export default StatusReports;
