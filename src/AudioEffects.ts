enum AudioStatus {
  Play = "play",
  Pause = "pause",
}
class AudioEffects {
  readonly path: string;
  private audio: HTMLAudioElement;

  constructor(path: string) {
    this.path = path;
    this.audio = new Audio(path);
  }

  setStatus(status: AudioStatus) {
    this.audio.currentTime = 0;
    status === AudioStatus.Play ? this.audio.play() : this.audio.pause();
  }
}

export { AudioStatus, AudioEffects };
