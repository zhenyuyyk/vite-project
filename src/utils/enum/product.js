import MapObject from "@/utils/mapObject.js";

export const productTypeList = new MapObject({
    ongoing: {
        label: '进行中',
        value: 0,
    },
    finished: {
        label: '已结束',
        value: 1,
    }
})
