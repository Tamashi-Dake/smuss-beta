import SectionList from "@/components/home/SectionList";
import Footer from "@/components/layout/Footer";
import Contact from "@/components/patials/Contact";
const About = () => {
  return (
    <div
      className=" flex flex-col m-auto gap-y-10 p-4 text-white max-w-[1500px]
          mx-auto select-none"
    >
      <SectionList className="px-4 lg:max-w-[80%]">
        <h1 className="text-4xl font-bold ">About us</h1>
        <div className=" leading-10  flex flex-col gap-4">
          <p>
            With Smuss, it&apos;s easy to find the right music for every moment
            - on your phone, your computer, your tablet and more.
          </p>
          <p>
            There are a lots of tracks and playlist on Smuss. So whether
            you&apos;re behind the wheel, working out, partying or relaxing, the
            right music or podcast is always at your fingertips. Choose what you
            want to listen to, or let Smuss surprise you.{" "}
          </p>
          <p>
            You can also browse through the collections of friends playlist,
            artists, and songs, or create your personal playlist and just sit
            back.{" "}
          </p>
          <p>Soundtrack your life with Smuss. Subscribe or listen for free.</p>
        </div>
      </SectionList>
      {/* contact */}
      <SectionList className="px-4">
        <h1 id="contact" className="text-4xl font-bold ">
          Contact
        </h1>
        <div className=" leading-10 flex flex-col gap-4">
          <p>
            We are here to help you with any questions you have. Feel free to
            contact us.
          </p>
          <Contact />
        </div>
      </SectionList>
      <Footer />
    </div>
  );
};

export default About;
