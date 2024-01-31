StructureFactory.prototype.compact =
    function (resourceType) {
        switch (resourceType) {
            case RESOURCE_HYDROGEN: this.produce(RESOURCE_REDUCTANT);
            case RESOURCE_OXYGEN: this.produce(RESOURCE_OXIDANT);
            case RESOURCE_LEMERGIUM: this.produce(RESOURCE_LEMERGIUM_BAR);
        }
    }
