import { useCookies } from "react-cookie";

export default () => {
    const [cookies, setCookie] = useCookies(["likes"]);

    const inTenYears = new Date();
    inTenYears.setFullYear(inTenYears.getFullYear() + 10);

    const savedLikes = cookies.likes ? cookies.likes : {};

    const updateCookie = () => {
        setCookie("likes", savedLikes, {
            expires: inTenYears,
        });
    };

    if (!cookies.likes) {
        updateCookie();
    }

    const isLiked = (id) => {
        return (id in savedLikes);
    };

    const like = (id) => {
        if (isLiked(id)) {
            delete savedLikes[id];
        } else {
            savedLikes[id] = true;
        }
        updateCookie();
    }

    return {
        isLiked, like
    };
};