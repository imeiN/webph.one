export const settings = {
    display_name        : '1006',
    uri                 : 'sip:1006@voice.91wangame.com',
    password            : 'Fulin@888',
    socket              :
    {
        uri           : 'wss://voice.91wangame.com:7443',
        via_transport : 'wss',
    },
    registrar_server    : 'voice.91wangame.com',
    contact_uri         : null,
    authorization_user  : null,
    instance_id         : null,
    session_timers      : true,
    use_preloaded_route : false,
    pcConfig            :
    {
        rtcpMuxPolicy : 'negotiate',
        iceServers    :  []
    },
    answer:
    {
        mediaConstraints: {
            audio: true,
            video: false
        },
        rtcOfferConstraints : {
            offerToReceiveAudio : true,
            offerToReceiveVideo : false
        }
    },
    call:
    {
        mediaConstraints: {
            audio: true,
            video: false
        },
        rtcOfferConstraints : {
            offerToReceiveAudio : true,
            offerToReceiveVideo : false
        }
    },
    custom:
    {
        // dtmfsGateway: null,
        dtmfsGateway: '1001@voice.91wangame.com',
        // outbound: 'peallagoon',
        outbound: null,
        defaultUtiDomain: 'voice.91wangame.com',
        virtualNumbersPrefixs: [999100, 999200, 505051, 999800, 505052],
        virtualNumberPrefix: 999100,
        conferenceCallPrefixs: [500],
        fakeEmail: '@generic_email.saycel'
    }
};

export interface CustomSettingsI {
    dtmfsGateway?: string;
    outbound?: string;
    defaultUtiDomain: string;
    virtualNumbersPrefixs: number[];
    virtualNumberPrefix: number;
    fakeEmail: string;
    conferenceCallPrefixs: number[];
}
