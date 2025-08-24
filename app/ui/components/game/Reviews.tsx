import { fetchGameReviews } from "@/app/lib/api"
import { ReviewType } from "@/app/lib/definition";
import { Review } from "./Review";
// import { FormReview } from "./FromReview";

export async function ReviewsSection({slug} : {slug: string}) {
    const reviews = await fetchGameReviews(slug);

    if(reviews.results.length > 0){
        <span className="text-lg text-white">No reviews</span>
    }

    return (
        <div>
            <h3 className="text-lg text-white">Reviews <span className="text-white/65">({reviews?.count})</span>:</h3>
            {/* <FormReview /> */}
            <div className="grid grid-cols-1 gap-6 mt-2 grow lg:grid-cols-2">
                {reviews.results.map((review : ReviewType) => (
                    <Review review={review} key={review.id}/>
                ))}
            </div>
        </div>
    )
}