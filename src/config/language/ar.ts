export let ar = {
  welcome: 'Arab Welcome',
  cancel: 'Cancel',
  audio_permission_error:
    'Permission is required to be granted to record audio, go to settings to grant permission.',
  hold_down: 'Hold down to begin recording',
  options: 'Options',
  closed: 'Closed',
  closing_soon: 'Closing Soon',
  open: 'Open',
  choose_map: 'Choose from map',
  saved_locations: 'Saved Locations',
  others_colon: 'Others:',
  invoice: 'Invoice',
  grand_total: 'Grand Total:',
  grand_total2: 'GRAND TOTAL',
  view_invoice: 'View Invoice',
  photo: 'Photo',
  track_delivery: 'Track Delivery',
  received_invoice: 'You’ve received an invoice',
  runner: 'Runner',
  accept: 'Accept',
  decline: 'Decline',
  description: 'DESCRIPTION',
  rate: 'RATE',
  qty: 'QTY',
  subtotal: 'SUBTOTAL',
  copy: 'Copy',
  reply: 'Reply',
  edit: 'Edit',
  remove: 'Delete',
  change: 'Change',
  camera: 'Camera',
  photo_library: 'Photo Library',
  total_amount_txt: (options?: string[]) =>
    `The total cost for the items purchased in ${
      options?.length ? options[0] : ''
    } is ${
      options && options?.length > 0 ? options[1] : ''
    }. Tap Accept below to pay for this errand or tap on Decline to decline the price.`,
  runner_joined: (options?: string[]) =>
    `Runner ${options?.length ? options[0] : ''} joined the chat`,
  give_access: 'Give Access',
  not_now: 'Not Now',
  let_errand_access: (options?: string[]) =>
    `Let SendErrand Access ${options?.length ? options[0] : ''}?`,
  permission_msg: (options?: string[]) =>
    `In order to share personal information (ex, photos, voice note, location), current location & more, Kindly give SendErrand permission to access your ${
      options?.length ? options[0] : ''
    }`,
  permission_error: 'Permission Denied',
};
