export interface TrackIdHeader {
  'Zuora-Track-Id'?: string
}
export interface TrackIdAndEntityIdsHeader {
  'Zuora-Track-Id'?: string
  'Zuora-Entity-Ids'?: string
}

export interface TrackIdEntityIdsAndVersionHeaders {
  'X-Zuora-WSDL-Version'?: string
  'Zuora-Track-Id'?: string
  'Zuora-Entity-Ids'?: string
}
