import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      { text: 'Post 1' },
      { text: 'Post 2' },
      { text: 'Post 3' },
      { text: 'Post 4' },
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      const findedPosts = postsService.findMany();
      const mapedPosts = findedPosts.map(item => ({ text: item.text }))
      expect(mapedPosts).toEqual(expect.arrayContaining(posts));
    });

    it('should return correct posts for skip and limit options', () => {
      const options = { skip: 1, limit: 2 }
      const findedPosts = postsService.findMany(options);
      const mapedPosts = findedPosts.map(item => ({ text: item.text }))
      expect(mapedPosts).toEqual(expect.arrayContaining(posts.slice(options.skip).slice(0, options.limit)));
    });


    it('should return correct posts for skip option', () => {
      const options = { skip: 2 }
      const findedPosts = postsService.findMany(options);
      const mapedPosts = findedPosts.map(item => ({ text: item.text }))
      expect(mapedPosts).toEqual(expect.arrayContaining(posts.slice(options.skip)));
    });


    it('should return correct posts for skip option', () => {
      const options = { limit: 2 }
      const findedPosts = postsService.findMany(options);
      const mapedPosts = findedPosts.map(item => ({ text: item.text }))
      expect(mapedPosts).toEqual(expect.arrayContaining(posts.slice(0, options.limit)));
    });
  });
});