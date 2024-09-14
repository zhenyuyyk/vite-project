import service from "@/api/request.js";

export function getTimes(data) {
    return service({
        url: `/mockjs/getTimes`,
        method: "post",
        data,
    });
}
