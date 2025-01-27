import images from "@/images/index";
import Image from "next/image";

export default({
  setOpenProfile,
  setCompleteModal,
  setGetModel,
  setStartModal,
}) => {
  const team = [
    { avatar: images.issuePurchaseOrder, modalType: "issuePurchaseOrder" },
    { avatar: images.materialProduction, modalType: "materialProduction" },
    { avatar: images.transportMaterial, modalType: "transportMaterial" },
    { avatar: images.deliverMaterial, modalType: "deliverMaterial" },
    { avatar: images.acceptMaterial, modalType: "acceptMaterial" },
    { avatar: images.getOrderStatus, modalType: "getOrderStatus" },
  ];

  const openModelBox = (modalType) => {
    if (modalType === "issuePurchaseOrder") {
      setCompleteModal(true);
    } else if (modalType === "materialProduction") {
      setGetModel(true);
    } else if (modalType === "transportMaterial") {
      setStartModal(true);
    } else if (modalType === "deliverMaterial") {
      setOpenProfile(true);
    }
  };

  return (
    <section className="py-0 pb-14">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="mt-12">
          <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {team.map((item, i) => (
              <li key={i}>
                <div 
                  onClick={() => openModelBox(item.modalType)} 
                  className="w-full h-60 sm:h-52 md:h-56">
                  <Image 
                    src={item.avatar}
                    className="w-full h-full object-cover object-center shadow-md rounded-xl"
                    alt=""
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
