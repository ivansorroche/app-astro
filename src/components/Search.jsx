import Fuse from 'fuse.js'
import { useState } from 'react'


const options = {
    keys: ['data.title', 'data.description'],
    minMatchCharLength: 2,
    includeScore: true,
    includeMatches: true
}

export default function Search({ searchList }) {
    const [query, setQuery] = useState('')

    const fuse = new Fuse(searchList, options)

    const posts = fuse.search(query).map((result) => result.item).splice(0,5)

    function handleOnSearch({ target = {} }) {
        const { value } = target
        setQuery(() => value)
    }

    return (
        <div className='p-7'>
        <label htmlFor='search' className='sr-only'>
            Search Post
        </label>
        <input
            className='block p-4 w-full border text-sm text-gray-900 rounded border-gray-300 mt-4 pl-4'
            placeholder='Search Post'
            id='search'
            type='text'
            value={query}
            onChange={handleOnSearch}
        />

        {query.length > 1 && (
            <p>
                Encontrei {posts.length} {posts.length > 1 ? 'artigos' : 'artigo'}
            </p>
        )}

        <ul>
            {posts && posts.map(post => {
                {console.log(post)}
                return (
                <li className='py-4'>
                    <a className='text-gray-900' href={`/blog/${post.id}`}>{post.data.title}</a>
                    <p className='text-sm test-gray-700'>{post.data.description}</p>
                </li>
                )
            })}
        </ul>
        </div>
    )
}