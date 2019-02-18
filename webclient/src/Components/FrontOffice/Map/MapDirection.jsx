import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import {
  withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer,
} from 'react-google-maps';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';

class MapDirection extends Component {
  state = {
    myPosition: null,
    directions: null,
  };

  static propTypes = {
    center: PropTypes.object,
    zoom: PropTypes.number,
  };

  static defaultProps = {
    center: {
      lat: 36.885477,
      lng: 10.323796,
    },
    zoom: 15,
  };

  claculateRoute = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        await this.setState({
          myPosition: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });

        const DirectionsService = new window.google.maps.DirectionsService();

        await DirectionsService.route({
          origin: new window.google.maps.LatLng(36.885477, 10.323796),
          destination: new window.google.maps.LatLng(
            position.coords.latitude, position.coords.longitude
          ),
          travelMode: window.google.maps.TravelMode.DRIVING,
        }, (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result,
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        });
      });
    }
  }

  render() {
    const { center, zoom } = this.props;
    const { myPosition, directions } = this.state;
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Button
          onClick={this.claculateRoute}
          variant="contained"
          color="primary"
        >
          Calculer l&apos;itinéraire
        </Button>
        <GoogleMap
          defaultZoom={zoom}
          defaultCenter={center}
        >
          <Marker position={center}>
            <InfoBox
              options={{ closeBoxURL: '', enableEventPropagation: true }}
            >
              <div style={{ backgroundColor: 'yellow', opacity: 0.75, padding: '12px' }}>
                <div style={{ fontSize: '16px', fontColor: '#08233B' }}>
                  CyberShop
                </div>
              </div>
            </InfoBox>
          </Marker>
          <Marker position={myPosition} />
          {directions && (
            <>
              <DirectionsRenderer directions={directions} />
            </>
          )}
        </GoogleMap>
      </div>
    );
  }
}


export default withScriptjs(withGoogleMap(MapDirection));
