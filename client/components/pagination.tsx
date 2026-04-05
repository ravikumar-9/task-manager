import { ArrowLeft, ArrowRight } from "lucide-react"
import ReactPaginate from "react-paginate";

const Pagination = (
  {total,pageCount,skip,forcePage,handlePageClick}:
  {
    total: number;
    pageCount: number;
    skip: number;
    forcePage: number;
    handlePageClick: (selectedItem: { selected: number }) => void;
  }
) => {
  return (
    <div className="flex items-center justify-between flex-wrap mt-4 md:mt-0 border-t">
      <div className="text-md text-white">
        Showing{" "}
        <span className="font-medium text-white">
          {!total ? 0 : skip + 1} to{" "}
          {total < skip + 6 ? total : skip + 6} of {total}{" "}
        </span>{" "}
        entries
      </div>
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        breakLabel="..."
        nextLabel={<ArrowRight className="h-4 w-4" />}
        previousLabel={<ArrowLeft className="h-4 w-4" />}
        onPageChange={handlePageClick}
        forcePage={forcePage}
        containerClassName="flex items-center gap-2 mt-4 flex-wrap"
        pageClassName="h-10 w-10 flex items-center justify-center rounded-full border border-slate-400 text-sm cursor-pointer"
        pageLinkClassName="w-full h-full flex items-center justify-center"
        activeClassName="bg-white text-gray-900"
        previousClassName="h-10 w-10 flex items-center justify-center rounded-full border border-slate-400 text-sm cursor-pointer"
        nextClassName="h-10 w-10 flex items-center justify-center rounded-full border border-slate-400 text-sm cursor-pointer"
        breakClassName="h-10 w-10 flex items-center justify-center text-gray-500"
      />
    </div>
  );
};

export default Pagination;