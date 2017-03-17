import { NativeAudio } from 'ionic-native';

export class PlaybackController {
  public isComplete: boolean = true;

  private _playbackID: Array<any> = [];
  private _path: string;

  private _default_playback_id: string = 'session';

  constructor() {
    this._path = window.localStorage.getItem('path_sounds');
  }


  public playSound(filename: string):Promise<any> {
    let media_path = this._path+filename;

    return new Promise((reslove, reject) => {
      NativeAudio.preloadComplex(this._default_playback_id, media_path, 1, 1, 0).then((preloaded) => {
        return new Promise((rs, rj) =>{
          NativeAudio.play(this._default_playback_id, (played) => {
            rs(played);
          })
        });
      }).then((played) => {
        return NativeAudio.unload(this._default_playback_id);
      }).then((finished) => {
        reslove('Playback Completed');
      }).catch( (err) => {
        if(err == 'A reference already exists for the specified audio id.') {
          NativeAudio.unload(this._default_playback_id);
        }
      });
    })
  } // public playSound(id, filename):Promise<any> {}

  public stopSound(uri):Promise<any> {
    return new Promise((resolve, reject) => {
      NativeAudio.stop(uri).then((suc) => {
        return NativeAudio.unload(uri);
      }).then((unloaded) => {
        resolve('stopSound(): Stopped and Unloaded' + unloaded);
      }).catch((err) => {
        reject(new Error("stopSound(): Something went wrong: " + err));
      });
    });
  } // public stopSound(uri):Promise<any> {}
}
