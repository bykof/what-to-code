import { useCookies } from "react-cookie";

export default () => {
    const [cookies, setCookie] = useCookies(["likes"]);

    var inTenYears = new Date();
    inTenYears.setFullYear(inTenYears.getFullYear() + 10);

    let savedLikes = cookies.likes ? cookies.likes : [];

    const updateCookie = () => {
        setCookie("likes", savedLikes, {
            expires: inTenYears,
        });
    };

    if (!cookies.likes) {
        updateCookie();
    }

    const isLiked = (id) => {
        return savedLikes.includes(id);
    };

    const updateLikes = (id) => {
        if (isLiked(id)) {
            const index = savedLikes.indexOf(id);
            savedLikes.splice(index, 1);
        } else {
            savedLikes.push(id);
        }
        updateCookie();
    }

    return {
        isLiked, updateLikes
    };
};