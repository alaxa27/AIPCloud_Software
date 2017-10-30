import React, {Component} from 'react';
import Audio from 'react-audioplayer';

class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      pos: 0
    };
    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handlePosChange = this.handlePosChange.bind(this);
  }

  componentWillMount() {
  }

  handleTogglePlay() {
    this.setState({
      playing: !this.state.playing
    });
  }
  handlePosChange(e) {
    this.setState({pos: e.originalArgs[0]});
  }
  render() {
    const somePlaylist = [
      {
        name: "test", // song name
        src: 'http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3'
      }]
      // <Audio
      //   width={600}
      //   height={400}
      //   autoPlay={false}
      //   playlist={somePlaylist}
      //   />
    return (
      <div>
      </div>
    );
  }
}

export default AudioPlayer;
