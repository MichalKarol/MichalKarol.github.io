<template>
    <div id="mapid">
    </div>
</template>

<style scoped >
#mapid {
    width: 100%;
    height: 50vmin;
    z-index: 10;
}

@media screen and (max-width: 768px) {
    #mapid {
        width: 100%;
        height: 80vmin;
        z-index: 10;
    }
}
</style>
<style src="leaflet/dist/leaflet.css"></style>

<script lang="ts">
// @ts-ignore
import L from 'leaflet/dist/leaflet';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
    name: 'Leaflet',
    components: { Leaflet },
})
class Leaflet extends Vue {
    @Prop({default: []})
    private coordinates!: number[];

    @Prop({default: 10})
    private zoom!: number;

    private mounted() {
        const mymap = L.map('mapid').setView(this.coordinates as L.LatLngExpression, this.zoom);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> \
                          © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> \
                          <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map \
                          </a></strong>',
            maxZoom: 18,
            id: 'mapbox.light',
            accessToken: 'pk.eyJ1IjoibWthcm9sIiwiYSI6ImNqazl4ODMxMDJ3OTEzd2xlbnN6OHRlMTgifQ.I_mm4Sc8fkKJaFpQc8BWjg',
        }).addTo(mymap);
        const greenIcon = L.icon({
            // iconUrl: marker,
            iconAnchor:   [16, 24],
            popupAnchor:  [0, -12],
        });
    }
}

export default Leaflet;
</script>