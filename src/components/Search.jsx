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
        <>
        <label htmlFor='search' className='sr-only'>Search Post</label>
        <input placeholder='Search Post' id='search' type='text' value={query} onChange={handleOnSearch} />

        {query.length > 1 && (
            <p>
                Encontrei {posts.length} {posts.length > 1 ? 'artigos' : 'artigo'}
            </p>
        )}

        <ul>
            {posts && posts.map(post => {
                return (
                <li>
                    <a href='#'>{post.data.title}</a>
                    <p>{post.data.description}</p>
                </li>
                )
            })}
        </ul>
        </>
    )
}