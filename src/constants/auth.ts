export const officialAPIEndpoint = 'http://172.20.8.79:8000/v1/chat/completions';
const customAPIEndpoint =
  import.meta.env.VITE_CUSTOM_API_ENDPOINT || 'http://locahost:8000/v1/chat/completions';//'http://172.17.27.13:8000/v1/chat/completions';'http://192.168.1.33:8000/v1/chat/completions'
export const defaultAPIEndpoint =
  import.meta.env.VITE_DEFAULT_API_ENDPOINT || officialAPIEndpoint;

export const availableEndpoints = [officialAPIEndpoint, customAPIEndpoint];
