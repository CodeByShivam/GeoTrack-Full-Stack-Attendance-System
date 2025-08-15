const SkeletonCard = () => {
	return (
		<div className='flex flex-col w-[450px] h-[180px] p-4 border border-gray-300 bg-slate-50 rounded shadow animate-pulse'>
			<div className='h-6 bg-primary rounded mb-2'></div>
			<div className='h-4 bg-primary rounded mb-4'></div>
			<div className='h-4 bg-primary rounded'></div>
		</div>
	);
};

export default SkeletonCard;
