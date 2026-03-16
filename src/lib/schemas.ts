type _rec<T = string> = {
  _object: boolean;
  _timestamp: string;
  _type: string;
  _value: T;
  _writable: boolean;
};

export type listDevicesSchema = {
  _id: string;
  _deviceId: {
    _Manufacturer: string;
    _OUI: string;
    _ProductClass: string;
    _SerialNumber: string;
  };
  InternetGatewayDevice: {
    WANDevice: {
      WANConnectionDevice: {
        WANPPPConnection: {
          Username: _rec;
          Password: _rec;
          VLANEnable: _rec<boolean>;
          VLANID: _rec<number>;
          ConnectionStatus: _rec;
          X_FH_LanInterface: _rec;
        }[];
      }[];
    }[];
    LANDevice?: {
      LANEthernetInterfaceNumberOfEntries: _rec<number>;
      LANWLANConfigurationNumberOfEntries: _rec<number>;
      WLANConfiguration: {
        Enable: _rec<boolean>;
        SSID: _rec;
        PreSharedKey: {
          PreSharedKey: _rec;
          KeyPassphrase: _rec;
        }[];
        Channel: _rec<number>;
        ChannelsInUse: _rec<number>;
        AutoChannelEnable: _rec<boolean>;
        PossibleChannels: _rec;
        WPAAuthenticationMode: _rec;
        BeaconType: _rec;
      }[];
      Hosts: {
        HostNumberOfEntries: _rec;
      };
    }[];
    DeviceInfo?: {
      UpTime: _rec<number>;
      X_FH_Account: {
        X_FH_WebUserInfo: {
          WebUsername: _rec;
          WebPassword: _rec;
          WebSuperUsername: _rec;
          WebSuperPassword: _rec;
        };
      };
    };
    X_FH_ACL?: {
      Enable: _rec;
      Rule: {
        Direction: _rec;
        Enable: _rec;
        Protocol: _rec;
      }[];
    };
  };
};
