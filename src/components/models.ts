export interface Response {
  data: DailyData;
}
export interface DailyData {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  url: string;
  title: string;
  media_type: 'image' | 'video';
}
