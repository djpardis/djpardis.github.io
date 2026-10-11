require "webrick/httpresponse"

class WEBrick::HTTPResponse
  def send_body_io(socket)
    begin
      return if @request_method == "HEAD"

      if chunked?
        buf = +""
        loop do
          @body.readpartial(@buffer_size, buf)
          size = buf.bytesize
          socket.write("#{size.to_s(16)}#{CRLF}#{buf}#{CRLF}")
          @sent_size += size
        rescue EOFError
          break
        end
        socket.write("0#{CRLF}#{CRLF}")
      else
        if %r{\Abytes (\d+)-(\d+)/\d+\z} =~ @header["content-range"]
          offset = Regexp.last_match(1).to_i
          remaining = Regexp.last_match(2).to_i - offset + 1
          @body.seek(offset, IO::SEEK_SET)
        else
          remaining = @header["content-length"]
          remaining = remaining.to_i if remaining
        end

        @sent_size = 0
        loop do
          break if remaining && remaining <= 0

          read_size = remaining ? [@buffer_size, remaining].min : @buffer_size
          data = @body.read(read_size)
          break if data.nil? || data.empty?

          socket.write(data)
          @sent_size += data.bytesize
          remaining -= data.bytesize if remaining
        end
      end
    ensure
      @body.close
      remove_body_tempfile
    end
  end
end
