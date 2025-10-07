import FacilityItem from "./FacilityItem"

const OutdoorFacilityCard = ({ type, data }) => {
  return (
    <div className="mt-10 bg-whiteF5 p-7 rounded-xl">
      <p className="text-lg font-bold text-gray3B">{type}</p>
      <div className="grid lg:grid-cols-2 gap-x-28 mt-6 divide-y-2 divide-dashed">
        {data?.map((item) => (
          <FacilityItem
            key={item.id}
            icon={`${process.env.NEXT_PUBLIC_IMG_URL}${item.of_icon}`}
            title={item.of_title}
            value={item.of_value}
            KM
          />
        ))}
      </div>
    </div>
  )
}

export default OutdoorFacilityCard