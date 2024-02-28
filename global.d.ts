// temp fix for use-sound
// TODO: remove this file when changing to Howler.js
declare module "use-sound" {
  export default function useSound(sound: any, options?: any): any;
}
