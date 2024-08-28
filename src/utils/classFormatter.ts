export const formatDate = (isoDateString: Date): string => {
  const date = new Date(isoDateString)
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' }
  return new Intl.DateTimeFormat('id-ID', options).format(date)
}

export const formatStatusBiro = (status: string): string => {
  switch (status) {
    case 'new':
      return 'Verifikasi Akun'
    case 'registered':
      return 'Full Register'
    case 'active':
      return 'Aktif'
    case 'block':
      return 'Diblok'
    case 'deleted':
      return 'Dihapus'
    default:
      return 'Data Tidak Ada'
  }
}

export const formatStatusData = (status: string): string => {
  switch (status) {
    case 'new':
      return 'Lengkapi Data'
    case 'registered':
      return 'Data Lengkap'
    case 'fill':
      return 'Menunggu Verifikasi'
    case 'rejected':
      return 'Perbaiki Data'
    case 'approved':
      return 'Buat Rekening Escrow'
    case 'block':
      return 'Diblok'
    case 'deleted':
      return 'Dihapus'
    default:
      return 'Data Tidak Ada'
  }
}

export const formatStatusBiroStyle = (status: string): string => {
  switch (status) {
    case 'new':
      return 'status-biro-new'
    case 'registered':
      return 'status-biro-registered'
    case 'active':
      return 'status-biro-active'
    case 'block':
      return 'status-biro-block'
    case 'deleted':
      return 'status-biro-deleted'
    default:
      return 'status-biro-default'
  }
}

export const formatStatusDataStyle = (status: string): string => {
  switch (status) {
    case 'new':
      return 'status-data-new'
    case 'registered':
      return 'status-data-registered'
    case 'fill':
      return 'status-data-fill'
    case 'rejected':
      return 'status-data-rejected'
    case 'approved':
      return 'status-data-approved'
    case 'block':
      return 'status-data-block'
    case 'deleted':
      return 'status-data-deleted'
    default:
      return 'status-data-default'
  }
}

export const formatStatusBtnStyle = (status: string): string => {
  if (status === 'fill') {
    return 'btn btn-primary btn-sm text-white font-normal'
  } else return 'btn btn-ghost text-primary btn-sm font-normal'
}

export const formatAlignContentDetailModalStyle = (type: string): string => {
  if (typeof type !== 'string') {
    return 'flex-center'
  } else return ''
}
