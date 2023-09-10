StructureFactory.prototype.compact =
    function (resourceType) {
        if (this.store.energy > 1000 && this.store[resourceType] > 2000) {
            switch (resourceType) {
                case RESOURCE_HYDROGEN: this.produce(RESOURCE_REDUCTANT);
                case RESOURCE_OXYGEN: this.produce(RESOURCE_OXIDANT);
                case RESOURCE_LEMERGIUM: this.produce(RESOURCE_LEMERGIUM_BAR);
            }
        }
    }
