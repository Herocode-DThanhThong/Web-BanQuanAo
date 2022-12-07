import { INavigation } from "@/interfaces/index";
import Navigation from "../Navigation";

const AboutPage = () => {
  const navigationList: INavigation[] = [
    {
      title: "Trang chủ",
      url: "/",
    },
    {
      title: "About",
      url: "/about",
    },
  ];

  return (
    <div className="relative">
      <Navigation navigationList={navigationList} />
      <div className="max-w-[95%] mx-auto py-8 z-50 bg-white">
        <div className="flex gap-8">
          <div className="px-4 py-2 border-2 w-[300px]">
            <h3 className="text-center uppercase py-2 font-medium border-b-[3px] rounded-sm border-b-black">
              danh mục trang
            </h3>
            <div className="mt-3">
              <ul>
                <li className="my-3 text-base cursor-pointer hover:opacity-90">
                  Giới thiệu
                </li>
                <li className="my-3 text-base cursor-pointer hover:opacity-90">
                  Chính sách đổi trả{" "}
                </li>
                <li className="my-3 text-base cursor-pointer hover:opacity-90">
                  Chính sách bảo mật
                </li>
                <li className="my-3 text-base cursor-pointer hover:opacity-90">
                  Điều khoản và dịch vụ
                </li>
              </ul>
            </div>
          </div>

          <div className="flex-1">
            <h1 className="font-bold text-3xl">Giới thiệu</h1>
            <p className="mt-4 text-base leading-8">
              Chúng mình xuất hiện để đem tới mọi người một chất lượng áo tốt
              nhất, với giá thành hấp dẫn nhất để đưa Outerity đến với tất cả
              lứa tuổi và khắp mọi vùng miền đất nước. Với mục đích cung cấp cho
              người dùng sản phẩm với chất lượng tuyệt vời. Chúng mình xuất hiện
              để đem tới mọi người một chất lượng áo tốt nhất, với giá thành hấp
              dẫn nhất để đưa Outerity đến với tất cả lứa tuổi và khắp mọi vùng
              miền đất nước. Với mục đích cung cấp cho người dùng sản phẩm với
              chất lượng tuyệt vời. Chúng mình xuất hiện để đem tới mọi người
              một chất lượng áo tốt nhất, với giá thành hấp dẫn nhất để đưa
              Outerity đến với tất cả lứa tuổi và khắp mọi vùng miền đất nước.
              Với mục đích cung cấp cho người dùng sản phẩm với chất lượng tuyệt
              vời
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
