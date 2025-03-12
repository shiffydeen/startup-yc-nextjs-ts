import Image from "next/image";
import SearchForm from "../../components/SearchForm";
import StartUpCard, { StartUpTypeCard } from "@/components/StartUpCard";
// import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";


export default async function Home({searchParams}: {
  searchParams: Promise<{query ?: string}>
}) {

  const query = (await searchParams).query;
  const params = {search: query || null};

  const session = await auth();

  // const posts = await client.fetch(STARTUPS_QUERY);
 const {data: posts} = await sanityFetch({query: STARTUPS_QUERY, params})

  // console.log(JSON.stringify(posts, null, 2));

  // const posts = [{
  //   _createdAt: new Date(),
  //   views: 55,
  //   author: {_id: 1, name: 'Sheriff'},
  //   _id: 1,
  //   description: 'This is a description.',
  //   image: 'https://unsplash.com/photos/a-woman-standing-in-front-of-a-mirror-brushing-her-teeth-vuwDHNmwvHQ',
  //   category: 'Robots',
  //   title: "We Robots"
  // }]

  return (
    <>
    <section className="pink_container">
      <h1 className="heading">Pitch your startup, <br />connect with entrepreneurs</h1>
      <p className="sub-heading !max-w-3xl">Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions</p>
      <SearchForm query={query}/>
    </section>
    <section className="section_container">
      <p className="text-30-semibold">
        {query ? `Search results for "${query}"` : 'All Startups'}
      </p>
      <ul className="mt-7 card_grid">
        {posts?.length > 0 ? (
          posts.map((post: StartUpTypeCard, index: number) => (
            <StartUpCard key={post?._id} post={post}/>
          ))) : (
            <p className="no-results">No startups found</p>
          )}
      </ul>
    </section>

    <SanityLive />
    </>
  );
}
